# EmailJS Setup Guide

Follow these steps to configure EmailJS for automatic email sending:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to https://dashboard.emailjs.com/admin
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy your Service ID** (you'll need this later)

## Step 3: Get Your Public Key
1. Go to https://dashboard.emailjs.com/admin/integration
2. **Copy your Public Key**

## Step 4: Create Email Templates

You need to create 2 templates (one for each inquiry type):

### Template 1: Homeowner Portal
1. Go to https://dashboard.emailjs.com/admin/template
2. Click "Create New Template"
3. Name it: "Homeowner Portal Contact Form"
4. Set the **To Email** to: `support@elitepropmgt.com`
5. Set the **Subject** to: `New Contact Form Submission - Homeowner Portal`
6. In the **Content** field, use this HTML template:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div style="margin-bottom: 20px; font-size: 16px; font-weight: bold; color: #2c3e50;">
    New Contact Form Submission - Homeowner Portal
  </div>
  <div style="margin-bottom: 15px; padding: 10px; background-color: #f0f8ff; border-radius: 5px;">
    <div style="margin-bottom: 8px;"><strong>Inquiry Type:</strong> {{inquiry_type}}</div>
    <div style="margin-bottom: 8px;"><strong>Name:</strong> {{from_name}}</div>
    <div style="margin-bottom: 8px;"><strong>Email:</strong> {{from_email}}</div>
    <div style="margin-bottom: 8px;"><strong>Phone:</strong> {{phone}}</div>
    <div style="margin-bottom: 8px;"><strong>Community:</strong> {{community}}</div>
  </div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{from_name}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{inquiry_type}}</div>
          <p style="font-size: 16px; margin-top: 10px;">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #999;">
    This email was sent from the Elite Property Management contact form.<br>
    Please reply directly to: <a href="mailto:{{from_email}}">{{from_email}}</a>
  </div>
</div>
```

**Note:** The template uses these variables that match what the form sends:
- `{{inquiry_type}}` - The type of inquiry (Homeowner Portal or General Inquiries)
- `{{from_name}}` - Full name of the person submitting
- `{{from_email}}` - Their email address
- `{{phone}}` - Phone number (or "Not provided")
- `{{community}}` - Selected community (or "Not provided")
- `{{message}}` - The message content

7. Click "Save"
8. **Copy the Template ID** (you'll need this later)

### Template 2: General Inquiries
1. Create another template
2. Name it: "General Inquiries Contact Form"
3. Set the **To Email** to: `officemanager@elitepropmgt.com`
4. Set the **Subject** to: `New Contact Form Submission - General Inquiries`
5. Use the same HTML template as above, but change "Homeowner Portal" to "General Inquiries" in the first div
6. Click "Save"
7. **Copy the Template ID** (you'll need this later)

## Step 5: Update the Code

Open `contact.html` and replace these values:

1. **Line 316**: Replace `YOUR_PUBLIC_KEY` with your Public Key from Step 3
2. **Line 356**: Replace `YOUR_HOMEOWNER_PORTAL_TEMPLATE_ID` with your Homeowner Portal template ID
3. **Line 361**: Replace `YOUR_GENERAL_INQUIRIES_TEMPLATE_ID` with your General Inquiries template ID
4. **Line 388**: Replace `YOUR_SERVICE_ID` with your Service ID from Step 2

## Example:
```javascript
emailjs.init("abc123xyz");  // Your Public Key

// In the form handler:
templateId = 'template_abc123';  // Your template ID
emailjs.send('service_xyz789', templateId, templateParams);  // Your Service ID
```

## Step 6: Test
1. Open your contact form in a browser
2. Fill out the form
3. Select "Homeowner Portal" and submit - should send to support@elitepropmgt.com
4. Select "General Inquiries" and submit - should send to officemanager@elitepropmgt.com

## Free Tier Limits
- 200 emails per month (free tier)
- Upgrade available if you need more

## Troubleshooting
- Check browser console (F12) for any errors
- Verify all IDs are correct
- Make sure your email service is connected and verified
- Check EmailJS dashboard for delivery status

