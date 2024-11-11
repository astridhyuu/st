import assert from "assert";
import ConfigAutomaticTest from "../config/config";
import Registro from "../Tests/testForm";

    let driver = await ConfigAutomaticTest.initConfig()

    describe('Casos de prueba para el registro correcto del formulario.', function () {
        it('Acceder a la URL, digitar los campos de Firts Name, Last Name, Email, Seleccionar genero, Número de telefono, Fecha de Nacimiento, Asignatura, Hobbies, Subir una imagen, dirección, seleccionar estado y ciudad.', async function () {
            let result = await (new Registro(driver)).RegistroCorrecto()
            assert.equal(result,"se ejecutó correctamente")
        })
    })

    