const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function () {
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

  try {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    // Agregar un delay de 2 segundos entre cada instrucción
    const delay = 2000;

    // 1. En el campo Textarea agregue el siguiente texto: anita lava la tina.
    const textarea = await driver.findElement(By.id('textarea'));
    await textarea.sendKeys('anita lava la tina');
    await driver.sleep(delay);

    // 2. En el campo Dropdown (select) seleccione la opción Three.
    const dropdown = await driver.findElement(By.id('select'));
    await dropdown.findElement(By.css('option[value="3"]')).click();
    await driver.sleep(delay);

    // 3. En el campo Color picker seleccione el color con la siguiente configuración
    const colorPicker = await driver.findElement(By.id('color'));
    await colorPicker.sendKeys('#20a722');
    await driver.sleep(delay);

    // 4. En el campo Datepicker seleccione la fecha: 16 de agosto de 1970.
    const datepicker = await driver.findElement(By.id('datepicker'));
    await datepicker.sendKeys('08/16/1970');
    await driver.sleep(delay);

    // 5. Chequee el campo Default checkbox.
    const checkbox = await driver.findElement(By.id('default-checkbox'));
    await checkbox.click();
    await driver.sleep(delay);

    // 6. Presione el botón submit.
    const submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();
    await driver.sleep(delay);

    // 7. Capture el título Form submitted y muestrelo en consola.
    const formSubmittedTitle = await driver.wait(until.elementLocated(By.id('form-submitted-title')));
    const titleText = await formSubmittedTitle.getText();
    console.log('Título: ' + titleText);

    // 8. Capture el mensaje Received y muestrelo en consola.
    const receivedMessage = await driver.findElement(By.id('received-message'));
    const messageText = await receivedMessage.getText();
    console.log('Mensaje recibido: ' + messageText);
  } finally {
    await driver.quit();
  }
}
)
();