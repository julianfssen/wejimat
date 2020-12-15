# WeJimat - The Expense Tracker You Never Knew You Needed

WeJimat is an open-source expense tracker targeted towards Malaysian users. You can track your spendings, balances, and other transactions you're too lazy to keep track of on your own.

## Current Features

* Add a transaction
* View all transactions

## Work in Progress

* View transactions by day, week, month, and custom timelines
* View transactions by different payment channels (e.g. Grab, Boost, cash payments)
* Fancy charts for expense tracking
* Add bank account balances manually

## End Goals

* Integrate with payment channels to pull transactions and account balances automatically
* Integrate with banks to pull account balances (possible?)

## Running the App

The app will be hosted on web and mobile devices in the near future. For now, you can clone this repo and play around with it locally.

### How to clone:

**Pre-requisites:**

* Ruby 2.7.1 
* Rails 6.0.3.4

**Installation steps**

1. Clone the app: `git clone git@github.com:julianfssen/wejimat.git`
2. Navigate to the cloned folder (path relative to the directory you cloned into): `cd wejimat`
3. Install the dependencies: `bundle install`
4. Start the server: `rails s`
5. Start the frontend server: `cd client && yarn start` **or** `yarn start` if you're already in the `/client` folder.
6. Navigate to `localhost:3001` **or** the port defined by `yarn`.

## Issues

Open an issue or email me at julianfssen@gmail.com for any questions or issues.
