import streamlit as st
import pandas as pd
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


EMAIL_EMISOR = "kewinrami2005@gmail.com"
CONTRASENA_EMISOR = "vubd znfw qawk akzf"

if "aprendices" not in st.session_state:
    st.session_state.aprendices = []
if "bitacoras_seleccionadas" not in st.session_state:
    st.session_state.bitacoras_seleccionadas = {}

def enviar_correo(destinatario, asunto, mensaje):
    try:
        servidor = smtplib.SMTP('smtp.gmail.com', 587)
        servidor.starttls()
        servidor.login(EMAIL_EMISOR, CONTRASENA_EMISOR)

        msg = MIMEMultipart()
        msg['From'] = EMAIL_EMISOR
        msg['To'] = destinatario
        msg['Subject'] = asunto
        msg.attach(MIMEText(mensaje, 'plain'))

        servidor.sendmail(EMAIL_EMISOR, destinatario, msg.as_string())
        servidor.quit()
        st.success(f"Correo enviado a {destinatario}.")
    except Exception as e:
        st.error(f"No se pudo enviar el correo: {e}")

st.title("Registro de Aprendices")

nombre = st.text_input("Escribe el nombre del aprendiz:")
apellido = st.text_input("Escribe el apellido del aprendiz:")
numero_ficha = st.text_input("Escribe el número de ficha del aprendiz:")
email_aprendiz = st.text_input("Escribe el correo del aprendiz:")

if st.button("Añadir aprendiz"):
    if nombre.strip() and apellido.strip() and numero_ficha.strip() and email_aprendiz.strip():
        if any((aprendiz['Nombre'].lower() == nombre.lower() and aprendiz['Apellido'].lower() == apellido.lower()) for aprendiz in st.session_state.aprendices):
            st.warning("La combinación de nombre y apellido ya está registrada. Intente con otra.")
        else:
            st.session_state.aprendices.append({
                "Nombre": nombre.strip(),
                "Apellido": apellido.strip(),
                "Número de Ficha": numero_ficha.strip(),
                "Email": email_aprendiz.strip()
            })
            st.success(f"{nombre} {apellido} ha sido añadido a la lista de aprendices.")

st.session_state.aprendices = sorted(st.session_state.aprendices, key=lambda x: (x["Apellido"], x["Nombre"]))

with st.expander("Lista de Aprendices Registrados (ordenada alfabéticamente por apellido y nombre)", expanded=True):
    if st.session_state.aprendices:
        df_aprendices = pd.DataFrame(st.session_state.aprendices)
        df_aprendices['Bitácoras Entregadas'] = df_aprendices['Nombre'].apply(lambda nombre: f"{len(st.session_state.bitacoras_seleccionadas.get(nombre, []))}/12")
        st.table(df_aprendices)

        selected_index = st.selectbox("Selecciona un aprendiz para ver su avance de bitácoras:", range(len(st.session_state.aprendices)), format_func=lambda x: f"{df_aprendices.iloc[x]['Nombre']} {df_aprendices.iloc[x]['Apellido']}")

        aprendiz_seleccionado = st.session_state.aprendices[selected_index]
        if aprendiz_seleccionado['Nombre'] not in st.session_state.bitacoras_seleccionadas:
            st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']] = []

        st.subheader("Selecciona las bitácoras correspondientes:")
        for i in range(1, 13):
            checked = i in st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']]
            if st.checkbox(f"Bitácora {i}", value=checked):
                if i not in st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']]:
                    st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']].append(i)
            else:
                if i in st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']]:
                    st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']].remove(i)

        bitacoras_entregadas = len(st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']])
        st.progress(bitacoras_entregadas / 12)
        st.info(f"Bitácoras entregadas: {bitacoras_entregadas}/12")

        if bitacoras_entregadas < 12:
            if st.button("Enviar Aviso de Bitácoras Pendientes"):
                destinatario = aprendiz_seleccionado["Email"]
                mensaje = (f"Estimado(a) {aprendiz_seleccionado['Nombre']} {aprendiz_seleccionado['Apellido']},\n\n"
                           f"Esperamos que se encuentre bien. Nos dirigimos a usted para informarle que, a la fecha, su proceso de entrega de bitácoras presenta pendientes. Según nuestro registro, ha completado {bitacoras_entregadas}/12 bitácoras correspondientes a sus actividades. "
                           "Dado que la entrega de estas bitácoras es fundamental para el seguimiento de su progreso, le solicitamos que proceda con la entrega de las bitácoras restantes a la mayor brevedad posible. Esto garantizará que su avance quede registrado de manera adecuada..\n\n"
                           "En caso de que necesite alguna aclaración o requiera asistencia para cumplir con este requerimiento, no dude en ponerse en contacto con nosotro. Agradecemos su compromiso")
                enviar_correo(destinatario, "Aviso de Bitácoras Pendientes", mensaje)

        if st.button("Borrar aprendiz"):
            st.session_state.aprendices.pop(selected_index)
            del st.session_state.bitacoras_seleccionadas[aprendiz_seleccionado['Nombre']]
            st.success(f"{aprendiz_seleccionado['Nombre']} {aprendiz_seleccionado['Apellido']} ha sido borrado de la lista.")
            st.experimental_rerun()
    else:
        st.write("No hay aprendices registrados todavía.")

