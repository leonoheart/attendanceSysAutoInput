
const {Builder, By, until} = require('selenium-webdriver');


(async function(){
  let driver = new Builder().forBrowser('chrome').build();

  await driver.get(login\path);

  driver.findElement(By.id("id")).sendKeys(\your\username);
  driver.findElement(By.id("password")).sendKeys(\your\password);
  driver.findElement(By.css('.btn-control-inner.btn-control-inner-size-short')).click();
  driver.findElement(By.id("menu_icon")).click();
  let firstMenuItem = await driver.wait(until.elementLocated(By.css('.menu-item')), 30000);
  firstMenuItem.click();

  async function filloutOneDay(getRow) {
    const row = getRow();
    const dateType = await row.findElement(By.css(".work_day_type p")).getText();

    if (dateType === '平日') {
      await row.findElement(By.css("select.htBlock-selectOther")).click();

      const optionContent = await driver.wait(() => row.findElement(By.css('select.htBlock-selectOther option:nth-child(2)')), 10000);
      optionContent.click();

      const timeRecordRows = await driver.wait(until.elementsLocated(By.css('#recording_timestamp_table tr')), 300000);

      await timeRecordRows[1].findElement(By.css(".htBlock-selectmenu")).click();
      await timeRecordRows[1].findElement(By.css(".htBlock-selectmenu option[value='1']")).click();
      const timeStampElem11 =  timeRecordRows[1].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem11.clear();
      const timeStampElem12 =  timeRecordRows[1].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem12.sendKeys(\your\time1);


      await timeRecordRows[2].findElement(By.css(".htBlock-selectmenu")).click();
      await timeRecordRows[2].findElement(By.css(".htBlock-selectmenu option[value='2']")).click();
      const timeStampElem21 =  timeRecordRows[2].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem21.clear();
      const timeStampElem22 =  timeRecordRows[2].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem22.sendKeys(\your\time2);

      await timeRecordRows[3].findElement(By.css(".htBlock-selectmenu")).click();
      await timeRecordRows[3].findElement(By.css(".htBlock-selectmenu option[value='3']")).click();
      const timeStampElem31 =  timeRecordRows[3].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem31.clear();
      const timeStampElem32 =  timeRecordRows[3].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem32.sendKeys(\your\time3);

      await timeRecordRows[4].findElement(By.css(".htBlock-selectmenu")).click();
      await timeRecordRows[4].findElement(By.css(".htBlock-selectmenu option[value='4']")).click();
      let timeStampElem41 =  timeRecordRows[4].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem41.clear();
      let timeStampElem42 =  timeRecordRows[4].findElement(By.css(".recording_timestamp_time"));
      await timeStampElem42.sendKeys(\your\time4\);

      await driver.findElement(By.css(".specific-saveButtonBottom ")).click();
    }
  }

  const rows = await driver.wait(until.elementsLocated(By.css('.htBlock-adjastableTableF tbody > tr')), 100000);

  const setRowArray = [...Array(rows.length).keys()].map(index => () => {
    return driver.findElement(By.css(`.htBlock-adjastableTableF tbody > tr:nth-child(${index + 1})`));
  })

  setRowArray.reduce((acc, curr) => acc.then(() => filloutOneDay(curr)), Promise.resolve())


  }());