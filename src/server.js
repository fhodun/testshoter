const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
const validator = require("validator");
const Discord = require("discord.js");
// eslint-disable-next-line no-unused-vars
const { Client, MessageEmbed } = require("discord.js");
const { token, prefix, sleeptime, version } = require("./config.json");
const client = new Discord.Client();

// definition of sleep function
function sleep() {
  return new Promise((resolve) => setTimeout(resolve, sleeptime));
}

// discord embeded message funcition, need just `embedMessage(message, 'title', 'description')`
function embedMessage(message, title, description) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setColor(0xff0000)
    .setDescription(description);
  message.channel.send(embed);
}

// get screenshots from testportal
// TODO: different login details
// TODO: better optimization
async function getQuestions(message, test_link) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto(test_link, { waitUntil: "load" });
  await sleep();

  // input tester data
  // TODO: need to optimize
  // please don't bully me for that
  let that_must_be_here;
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=firstName]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=lastName]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=Klasa_text]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=identificator]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=personalId]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=phone]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=organizationName]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=city]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=postalCode]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=additional]").value = "‎")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=street]").value = "a@a.aa")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=age]").value = "0")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () =>
        (document.querySelector("input[name=Nr_w_dzienniku_number]").value =
          "0")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    await page.evaluate(
      () => (document.querySelector("input[name=email]").value = "a@a.aa")
    );
  } catch (error) {
    that_must_be_here = 1;
  }
  try {
    let button = await page.$(".mdc-radio__native-control");
    await button.click();
  } catch (error) {
    that_must_be_here = 1;
  }

  // start test
  try {
    await page.evaluate(() =>
      document.querySelector("a[id=start-form-submit]").click()
    );
  } catch (error) {
    embedMessage(
      message,
      "An unexpected problem occurred!",
      "The program could not work"
    );
    return;
  }

  await sleep();

  // get and convert information about test
  let questions = await page.$eval(
    ".question_header_content",
    (el) => el.textContent
  );
  questions = parseInt(questions.slice(10));

  let question_time = await page.$eval(
    "#remaining_time_content",
    (el) => el.textContent
  );
  question_time = question_time.replace(/\s+/g, "");

  let time_info = await page.$eval("#remaining_time_label", (el) => el.textContent);
  time_info = time_info.replace(/\s+/g, "");
  if (time_info === "Czasdozakończeniatestu:") {
    time_info = "Total time for the test";
  } else time_info = "Time for single question";

  let test_name = await page.$eval(".test-name", (el) => el.textContent);

  embedMessage(
    message,
    "Information about the test",
    `Test name: "${test_name}"
		Question amount: ${questions}
		${time_info}: ${question_time}
	`
  );
  await sleep();

  // test changing and screenshot
  do {
    let typee = '';
    // adjust page size
    let total_width = await page.evaluate(
      () => document.documentElement.offsetWidth
    );
    let total_height = await page.evaluate(
      () => document.documentElement.offsetHeight
    );
    await page.setViewport({
      width: total_width,
      height: total_height,
      deviceScaleFactor: 1,
    });
    await sleep();

    //await page.screenshot({ path: `${folder}/screenshot${1}.png` });
    //await message.channel.send({ files: [`${folder}/screenshot${1}.png`] });
    
    let question_n = await page.$eval(
      ".question_header_content",
      (el) => el.textContent
    );
    let question_c = await page.$eval(".question_essence", (el) => el.textContent);
    //console.log(question_n);
    let imgs = await page.$$eval('div[class=question_essence] img[src]', imgs => imgs.map(img => img.getAttribute('src')));
    let question_a = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('answer_body');
      for (var element of elements)
          data.push('\n - ' + element.textContent);
      return data;
    });
    if(await page.$('input[type=radio]')) {
      typee = '//Odpowiedź jednokrotnego wyboru';
    }
    if(await page.$('input[type=checkbox]')) {
      typee = '//Odpowiedź wielokrotnego wyboru';
    }
    //console.log(question_a);
    embedMessage(message, question_n, question_c + imgs + "\n" + typee + "\n" + question_a);
    
    // select answer if required
    if (
      (await page.$('div[class="special_wrap mandatory_question"]')) !== null
    ) {
      try {
        let button = await page.$(".selection_field");
        await button.click();
      } catch (error) {
        that_must_be_here = 1;
      }
    }

    // go to next question
    try {
      await page.evaluate(() =>
        document.querySelector("a[title=Następne]").click()
      );
    } catch (error) {
      that_must_be_here = 1;
    }
    try {
      await page.evaluate(() =>
        document.querySelector('a[title="Zatwierdź odpowiedź"]').click()
      );
    } catch (error) {
      that_must_be_here = 1;
    }
    try {
      await page.evaluate(() =>
        document.querySelector("a[id=confirmFinishPopup_rightBtn]").click()
      );
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      that_must_be_here = 1;
    }
    
    await sleep();
  } while ((await page.$('a[title=Następne]') !== null) || (await page.$('a[title="Zatwierdź odpowiedź"]') !== null));
  await browser.close();
}

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  let test_link;
  if (args[0]) {
    test_link = args[0];
  } else test_link = "";

  if (command === "help") {
    embedMessage(
      message,
      "Testshots commands help",
      "**Commands: **\n" +
        ":white_check_mark: `" +
        `${prefix}` +
        "test (testportal_test_link)` testportal test screenshoting start\n" +
        ":new: `" +
        `${prefix}` +
        "version` check the bot is up to date\n" +
        ":label: `" +
        `${prefix}` +
        "help` grants help\n" +
        ":bangbang: `" +
        `${prefix}` +
        "important` displays the most important informations\n" +
        ":flag_pl: `" +
        `${prefix}` +
        "wazne` displays the most important informations in Polish\n" +
        "\n**:busts_in_silhouette: Support server: **\n" +
        "https://discord.gg/TWRwsnMzD9 "
    );
  } else if (command === "test") {
    if (validator.isURL(test_link)) {
      embedMessage(
        message,
        "Screenshoting start",
        "This may take a while, please be patient"
      );
      getQuestions(message, test_link);
    } else {
      embedMessage(
        message,
        "Wrong URL",
        "You entered the wrong testportal link, \n here an example `!test (testportal_test_link)`"
      );
    }
  } else if (command === "version") {
    fetch("https://api.github.com/repos/fhodun/testshots/releases/latest")
      .then((response) => response.json())
      .then((data) => {
        if (data.tag_name === version) {
          embedMessage(
            message,
            "Version",
            ":tada: Your bot has the latest version of the program :tada:"
          );
        } else {
          embedMessage(
            message,
            "Version",
            ":sob: Your bot does not have the latest version of the program :sob:"
          );
        }
      });
  } else if (command === "important") {
    embedMessage(
      message,
      "Important",
      "The most important informations: \n" +
        " - the bot **does not send the answers** to the tests, only the content of the questions and answers\n" +
        " - the bot **is not invisible**, the teacher sees it as an empty field in the results, but if it is not familiar with technology, it will not understand that, example https://i.imgur.com/B9fE0gP.png\n" +
        " - if there is an **open** question in the test, the answer to which is **required**, the bot will stop\n"
    );
  } else if (command === "wazne") {
    embedMessage(
      message,
      "Ważne",
      "Najważniejsze informacje: \n" +
        " - bot **nie wysyła odpowiedzi** do testów, tylko treści pytań i odpowiedzi\n" +
        " - bot **nie jest niewidzialny**, nauczyciel widzi go w wynikach jako puste pole lecz jeżeli nie ogarnia to się nie skapnie, przykład https://i.imgur.com/B9fE0gP.png\n" +
        " - jeżeli w teście istnieje pytanie **otwarte**, na które odpowiedź jest **wymagana** to bot się zatrzyma\n"
    );
  } else embedMessage(message, "Wrong command", "Use `!help` for some help...");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setActivity("github.com/fhodun/testshoter", { type: "WATCHING" });
});

client.login(token);
