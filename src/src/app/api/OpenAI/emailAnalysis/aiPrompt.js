  export const scamEmailAiResponse = `<p>Here are the potential scam keywords/phrases identified in the email:</p>

  <ul>
    <li><span style="color: red;">"temporarily suspended"</span> - Often used in scam emails to create urgency.</li>
    <li><span style="color: red;">"confirm your personal information"</span> - Scam attempts often ask for sensitive personal information.</li>
    <li><span style="color: red;">"fail to do so within 24 hours"</span> - Urgency tactics to force quick action.</li>
    <li><span style="color: red;">"click here to verify your account"</span> - Scam emails often include a link to a fake site for collecting personal data.</li>
    <li><span style="color: red;">"social security number"</span> - Asking for sensitive information is a common scam tactic.</li>
  </ul>

  <p>These are phrases that may indicate this email is suspicious and should be investigated further.</p>
  `;

  export const scamEmailText = `Dear Valued Customer,
  We are writing to inform you that your account has been temporarily suspended due to suspicious activity.
  To restore access to your account, we require you to confirm your personal information immediately.
  If you fail to do so within 24 hours, your account will be permanently locked.
  Please follow the link below to verify your identity:
  Click here to verify your account.
  This link will take you to a secure page where you will be asked to enter your full name, date of birth, and social security number.
  Thank you for your prompt attention to this matter. We appreciate your cooperation.
  Sincerely, Secure Service Support Team`;

  // Construct the prompt to instruct the model to flag scam keywords
  export const firstPrompt = `
  You are a scam detector. Identify potential scam keywords in the following email and annotate them.
  Highlight any suspicious words or phrases that may indicate a scam.
  
  Email:
  """${scamEmailText}"""
  
  Annotate the scam keywords and explain why they are suspicious.`;

  export const notScamEmailText = `Dear [Customer Name],

  We hope you are doing well. This is a friendly reminder that your monthly statement is now available for viewing in your account. You can access it by logging into your account on our website.

  If you have any questions or need assistance, please do not hesitate to reach out to our support team. We are always happy to assist.

  Thank you for being a valued customer!

  Best regards,
  The Company Team`;
  export const notScamEmailAiResponse  = `<p>Here is the email with annotations showing it is not a scam email:</p>

  <ul>
    <li><span style="color: green;">"Dear [Customer Name]"</span> - This is a standard, personalized greeting commonly used in legitimate emails.</li>
    <li><span style="color: green;">"Your monthly statement is now available for viewing in your account"</span> - Legitimate companies will inform customers of their available account information without asking for sensitive personal details.</li>
    <li><span style="color: green;">"You can access it by logging into your account on our website"</span> - This is a normal instruction, encouraging customers to log in to a secure account to view information.</li>
    <li><span style="color: green;">"If you have any questions or need assistance, please do not hesitate to reach out to our support team"</span> - Offering customer support through legitimate channels is a good sign of a trustworthy company.</li>
    <li><span style="color: green;">"Thank you for being a valued customer!"</span> - This is a polite closing, common in professional communications.</li>
  </ul>

<p>The email does not contain any red flags such as urgency, fake links, or requests for sensitive personal information, which makes it not a scam email.</p>
`;