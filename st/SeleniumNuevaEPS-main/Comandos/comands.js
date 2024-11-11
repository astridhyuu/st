import {Builder,By, Key} from "selenium-webdriver";

export default class Comands{
    driver;
    constructor(driver){
        this.driver = driver;
      }

    // Enviar la dirección web donde se ejecutará la prueba
    async getUrl(url){
        try {
        await this.driver.get(url);
        } catch (error) {
        console.log(error);
        }
    }


    // Abrira una nueva pestaña en el navegador
  async newGetUrl(){
    try {
      await this.driver.switchTo().newWindow('tab'); 
    } catch (error) {
      console.log(error);
    }
  }

    // Maximizar el navegaor 
  async maximizeWindow(){
    try {
      await this.driver.manage().window().maximize();
    } catch (error) {
      console.log(error);
    }
  }

  // Buscar algun elemento en la web por medio del id
  async getElementById(id){
    let result=null;
    try {
      result = await this.driver.findElement(By.id(id));
    } catch (error) {
      console.log(error);
      result= null;
    }
    finally{
      return result;
    }
    
  }

    // Buscar algun elemento en la web por medio de alguna etiqueta o clase
  async getElementByCss(css){
    let result = null;
    try {
     result = await this.driver.findElement(By.css(css));
    } catch (error) {
      console.log(error);
      result = null;
    }
    finally{
      return result;
    }
  }



  //Buscar elgun elemento en la web por medio del nombre del elemento
  async getElementByName(css){
    let result = null;
    try {
      result = await this.driver.findElement(By.name(css));
    } catch (error) {
      console.log(error);
      result = null;
    }
    finally{
        return result;
    }
  }

 
    // Buscar algun elemento en la web por medio de un texto de un link
  async getElementByLinktext(link){
    let result = null;
    try {
      result = await this.driver.findElement(By.linkText(link))
    } catch (error) {
      console.log(error);
      result = null;
    }
    finally{
      return result;
    }
  }

//Busca un elemento por xPath
  async getElementByxPath(xpath){
    let result = null;
    try {
      result = await this.driver.findElement(By.xpath(xpath))
    } catch (error) {
      console.log(error);
      result = null;
    }
    finally{
      return result;
    }
  }
     // Funcion que nos permite esperar un determinado tiempo en segundos
     delay(time) {
        return new Promise((resolve) => {
          console.log("Empieza la espera...");
          setTimeout(() => {
            console.log("Se acabo la espera...");
            resolve(true);
          }, time * 1000);
        });
      }


// Se da la orden al navegador que realice un scroll hacia arriba
  async scroll(x,y){
    try {
      await this.driver.executeScript(`window.scrollTo(${x},${y})`);
    } catch (error) {
      console.log(error);
    }
  }


// Se envia la orden de ingresar texto en algun elemento
async sendKey(element, text){
    try {
      element.sendKeys(text);
    } catch (error) {
      console.log(error);
    }    
}

  
//Se envia la orden de hacer clic en algun elemento en especifico
  async click(element){
    try {
      element.click();
    } catch (error) {
      console.log("No se puede hacer clic al elemento en %s " %element);
    }
  }

  // se da la orden de cerrar el navegador
  async close(element){
    try {
      await this.driver.quit();
    } catch (error) {
      console.log(error)
    }
  }

  async resizeContainer(x,y){
    try {
      await this.driver.executeScript(`document.getElementsByClassName("${x}")[0].style.height = "${y}px";`);
    } catch (error) {
      console.log(error);
    }
  }


  // Se dá la orden al navegador para que fije un tamaño exacto de la pantalla.
  async resize(y){
    try {
      await this.driver.manage().window().setRect(x, y);
    } catch (error) {
      console.log(error);
    }
  }

  async enter(element,text){
    try {
      //await this.driver.actions().enter(element);
      await this.driver.sendKey(element,text, Key.ENTER);
    } catch (error) {
      console.log(error);      
    }
  }

  async catchElement(element){
    try {
        document.getElementById(element)
    } catch (error) {
      console.log(error);
    }
  }

  async clickBtnModal(x){
    try {
        await this.driver.document.getElementById(`${x}`).click();
    } catch (error) {
      console.log(error);
      
    }
  }

}