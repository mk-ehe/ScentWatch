# 🧴 ScentWatch

An automated perfume price tracker with passwordless authentication and email alerts. Built to help you hunt down the best fragrance deals without constantly checking the store yourself.

## ✨ Features

* **✨ Magic Link Authentication:** Passwordless, secure login system using stateless HMAC time-based tokens.
* **📉 Automated Price Tracking:** Periodically checks perfume prices and compares them using my perfumehub-api.
* **🔔 Email Alerts:** Sends an automated email notification the moment a price drops below threshold.
* **🛑 1-Click Unsubscribe:** Unique, secure links in the footer of every email allow users to stop tracking a specific fragrance instantly without logging in.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Deployed on **Vercel**

**Backend:**
* perfumehub-api
* fragrantica-api

## 🚀 How It Works

1.  Enter your email to request an access link.
2.  Click the Link sent to your inbox to access your dashboard.
3.  Paste a URL of the fragrance you want to track.
4.  If the price drops, you receive an email alert.

## 💻 Local Setup

1. Clone the repository:
```bash
git clone https://github.com/mk-ehe/scentwatch.git
