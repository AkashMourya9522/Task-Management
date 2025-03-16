import nodemailer from "nodemailer";
import cron from "node-cron";
import Task from "./models/task.model.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

async function executeTask() {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

    const dueTasks = await Task.find({ completeBy: tomorrowFormatted });

    if (dueTasks.length > 0) {
      for (let i = 0; i < dueTasks.length; i++) {
        transporter.sendMail({
          to: dueTasks[i].userMail,
          subject: `${dueTasks[i].title}`,
          html: `Your Task ${dueTasks[i].title} is due tomorrow! Make Sure To Finish It!`,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

cron.schedule("0 0 * * *", executeTask);

export default cron;
