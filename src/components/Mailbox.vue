<template>
  <Navbar />
  <div class="mailbox">
    <h1>My Mailbox</h1>
    <ul>
      <li v-for="email in emails" :key="email.id">
        <div class="email">
          <div class="email-header">
            <span class="email-sender">{{ email.sender }}</span>
            <span class="email-date">{{ email.date }}</span>
          </div>
          <div class="email-body">
            <span class="email-subject">{{ email.subject }}</span>
            <p class="email-message">{{ email.message }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import store from "../store/index.js";
export default {
  name: "Mailbox",
  components: {
    Navbar,
  },
  data() {
    return {
      emails: [
        {
          id: 1,
          sender: "John Doe",
          date: "2021-09-01",
          subject: "Meeting Reminder",
          message:
            "Just a friendly reminder that we have a meeting tomorrow at 10am.",
        },
        {
          id: 2,
          sender: "Jane Smith",
          date: "2021-08-30",
          subject: "New Product Launch",
          message:
            "We're excited to announce the launch of our new product line. Check it out on our website!",
        },
        {
          id: 3,
          sender: "Bob Johnson",
          date: "2021-08-28",
          subject: "Vacation Request",
          message:
            "I'd like to request some time off next month. Can we discuss this in our next meeting?",
        },
      ],
    };
  },
};
</script>

<style scoped src=".././css/mailbox.css" />
