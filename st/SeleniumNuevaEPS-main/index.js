import Registro from "./Tests/primerTest.js"
import ConfigAutomaticTest from "./config/config.js"


async function main(){
    
    let driver = await ConfigAutomaticTest.initConfig()

    await(new Registro(driver).NuevaEps());
}

main()