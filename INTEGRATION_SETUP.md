# 🚀 Complete Integration Setup Guide

## ✅ **What's Already Done:**
- ✅ Google Sheets setup with headers
- ✅ Webhook functions ready
- ✅ Code added to registration.js
- ✅ Code added to registration.html

## 🔧 **What You Need to Do:**

### **Step 1: Get Your Webhook URL**
1. **Go to Google Apps Script**
2. **Click "Run"**
3. **Select `getWebhookUrl`** function
4. **Click "Run"**
5. **Copy the webhook URL** from the execution log

### **Step 2: Update the Webhook URL in Your Code**

#### **In `registration.js` (Line 464):**
Replace:
```javascript
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
```

With your actual webhook URL:
```javascript
const response = await fetch('https://script.google.com/macros/s/AKfycbyTi0vyur-Pod1btgGKGaYFDiv-MpbgZwFC5fyn1pxAGxB-zYZxU7_LbzmbU0_IK9zZuA/exec', {
```

#### **In `registration.html` (Line 35):**
Replace:
```javascript
const WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

With your actual webhook URL:
```javascript
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyTi0vyur-Pod1btgGKGaYFDiv-MpbgZwFC5fyn1pxAGxB-zYZxU7_LbzmbU0_IK9zZuA/exec";
```

### **Step 3: Test the Integration**

#### **Test 1: Add Test Data**
1. **In Google Apps Script, click "Run"**
2. **Select `addTestData`** function
3. **Click "Run"**
4. **Check your Google Sheet** - should see test data

#### **Test 2: Test Webhook**
1. **In Google Apps Script, click "Run"**
2. **Select `testWebhook`** function
3. **Click "Run"**
4. **Check your Google Sheet** - should see webhook test data

#### **Test 3: Test Real Registration**
1. **Go to your website**
2. **Fill out the registration form**
3. **Submit the form**
4. **Check your Google Sheet** - should see the new registration

## 🎯 **How It Works:**

### **Registration Flow:**
1. **User fills out registration form**
2. **Data is saved to Firebase** (as usual)
3. **Data is also sent to Google Sheets** via webhook
4. **Google Sheets updates immediately** with new registration
5. **You see real-time data** in your spreadsheet

### **Data Structure:**
- **Team Leader:** Name, Email, Phone, Registration Number, College, Year, Branch
- **Team Members:** Up to 3 additional members with full details
- **Problem Statement:** Code and Title
- **Registration Info:** Status, Email Verified, UID, Timestamp

## 📊 **What You'll See in Google Sheets:**

- **Row 1:** Complete headers (35 columns)
- **Row 2+:** Each registration with all details
- **Real-time updates:** New registrations appear immediately
- **Complete data:** All team information, problem statements, etc.

## 🔧 **Troubleshooting:**

### **If webhook fails:**
- Check the webhook URL is correct
- Make sure Google Apps Script is deployed
- Check the execution log for errors

### **If data doesn't appear:**
- Run the `addTestData` function first
- Check if headers are created in your Google Sheet
- Verify the webhook URL is accessible

## 🎉 **Benefits:**

- ✅ **Real-time sync** - Every registration appears immediately
- ✅ **Complete data** - All team details, problem statements, etc.
- ✅ **Easy to manage** - All data in one Google Sheet
- ✅ **No permission issues** - Uses webhook approach
- ✅ **Reliable** - Works with your existing registration flow

---

**Once you update the webhook URLs, your integration will be complete!** 🚀
