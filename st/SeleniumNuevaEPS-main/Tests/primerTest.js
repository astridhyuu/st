import Comands from "../Comandos/Comands.js"

export default class Registro extends Comands{
    constructor(driver){
        super(driver);
    }

    async NuevaEps(){

        await this.newGetUrl();

        // despues de abrir el navegador espera 2 segundos
        await this.delay(1);

        // luego de realizar la espera maximiza la pantalla
        await this.maximizeWindow();

        // ahora introduce la url en la barra de direcciones del navegador.
        await this.getUrl("https://portal.nuevaeps.com.co/Portal/home.jspx");

        // ahora se realiza una espera de 2 segundos 
        await this.delay(2);

        // aquí se desplaza la pantalla hacia abajo haciendo un scroll 150px
        await this.scroll(0,150);

        // se realiza una espera de 1 segundos antes de realizar un scroll
        await this.delay(1);

        //Se da la orden para buscar el elemneto Usuario
        let Nombre = await this.getElementById("loginForm:id");

        //Despues de encontrar el elemento espera 1 segundo.
        await this.delay(1);

        //se da la orden de escribir el texto en el elemento encontrado.
        await this.sendKey(Nombre, "1082775651");

        //Despues de encontrar el elemento espera 1.
        await this.delay(1);

        //Se da la orden para buscar el elemneto Clave
        let Apellido = await this.getElementById("loginForm:clave");

        //se da la orden de escribir el texto en el elemento encontrado.
        await this.sendKey(Apellido, "G0m4z.26566");
        
        //Despues de encontrar el elemento espera 1 segundo.
        await this.delay(1);

        // aquí se desplaza la pantalla hacia abajo haciendo un scroll 100px
        await this.scroll(0,100);

        // Se da la orden para buscar el elemento clave tipo de documento
        let documento = await this.getElementById("loginForm:tipoId");

        // Se da click en el datapiker
        await this.click(documento);
        
        //Despues damos 1 segundo de espera
        await this.delay(1);       

        // Se da la orden de buscar el elemento con xPath para la opcion cc
        let cc = await this.getElementByxPath("//option[@value='3']");

        // Se da la orden de hacer click en el elemento al macenado en la variable cc
        await this.click(cc);

        //Despues damos 1 segundo de espera
        await this.delay(1)

        // Se da la orden de buscar el elemento de boton de login
        let login = await this.getElementById("loginForm:loginButton");

        // Se da la orden de hacer clic el elemento encontrado
        await this.click(login);

        //Despues damos 1 segundo de espera
        await this.delay(1);

        // Se da la orden de buscar el elemento servicios en linea
        let servicios = await this.getElementById("tabServicios");

        // Se da la orden de hacer clic el elemento encontrado
        await this.click(servicios);

        //Despues damos 1 segundo de espera
        await this.delay(1);

        // Se da la orden de realizar un desplazamiento de 200 px hacia abajo.
        await this.scroll(0,200);

        //Despues damos 1 segundo de espera
        await this.delay(1);

        // Se da la orden de buscar el elemento con xPath Afiliado POS
        let afiliado =  await this.getElementByxPath("html/body/div/div[1]/table/tbody/tr/td[2]/div/table/tbody/tr[1]/td/div/span/table/tbody/tr[2]/td/a"); 
        // Se da la orden de hacer click sobre le campo asignatura / materia
        await this.click(afiliado);

        //Despues damos 1 segundo de espera
        await this.delay(1);
        
         // Se da la orden de buscar el elemento con xPath servicio cliente
        let servicioCliente =  await this.getElementByxPath("html/body/div/div[1]/table/tbody/tr/td[2]/div/table/tbody/tr[2]/td/div/span/table/tbody/tr[13]/td/div"); 
         // Se da la orden de hacer click sobre servicio al cliente
        await this.click(servicioCliente);

         //Despues damos 1 segundo de espera
        await this.delay(1);
        
        // Se da la orden de buscar el elemento con xPath Certificaciones
        let certificaciones =  await this.getElementByxPath("html/body/div/div[1]/table/tbody/tr/td[2]/div/table/tbody/tr[2]/td/div/span/table/tbody/tr[14]/td/div/table/tbody/tr[3]/td[2]/div/p"); 
         // Se da la orden de hacer click sobre certificaciones
        await this.click(certificaciones);

         //Despues damos 1 segundo de espera
        await this.delay(1);

        let afiliacion_id= await this.getElementByxPath("html/body/div/div[1]/table/tbody/tr/td[2]/div/table/tbody/tr[2]/td/div/span/table/tbody/tr[14]/td/div/table/tbody/tr[4]/td/div/table/tbody/tr[1]/td[2]/p/a");

        // Se da la orden de hacer clic el elemento encontrado
        await this.click(afiliacion_id);

        //Despues damos 1 segundo de espera
        await this.delay(1);

        // Se da la orden de buscar el elemento de seleccionar todos
        let selectorTodos = await this.getElementById("form:allSelection");

        // Se da la orden de hacer clic el elemento encontrado
        await this.click(selectorTodos);

        //Despues damos 1 segundo de espera
        await this.delay(1);

         // Se da la orden de buscar el elemente boton de imprimir
        let botonImprimir = await this.getElementById("form:j_id170");

        // Se da la orden de hacer clic el elemento encontrado
        await this.click(botonImprimir);

        //Despues damos 1 segundo de espera
        await this.delay(1);
    }
}
