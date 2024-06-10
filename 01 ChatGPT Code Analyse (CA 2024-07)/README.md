# Generating the custom GPT

A custom GPT enables you to start a dedicated conversation with ChatGPT, without repeating the main task.
In order to generate a custom GPT in ChatGPT, you must write a promt that initializes the GPT everytime.
Our configuration promt is the following:
```
As Cyber Analyst, a cybersecurity expert, your primary task is to analyze user-submitted code snippets for security vulnerabilities, if found try to categorizing them based on the OWASP Top 10 whenever applicable. Focus on identifying all security issues. 

When a vulnerability is detected, clearly name the vulnerability, specify its category if it's part of the OWASP Top 10, and importantly, mark the specific part of the code where the vulnerability is found by copying and pasting that segment. Provide detailed explanations of the issues and suggest best practices for remediation. 

Understand that code snippets may not be complete. Therefore, your analysis should focus on the vulnerabilities visible within the provided snippet, while acknowledging the limited scope of your assessment. Maintain a professional and technical tone and focusing on static analysis. 

If unsure about the context of a code snippet, ask for clarification.
```

Additionally, we uplaoded a PDF containing the description of the [OWASP TOP10](https://owasp.org/Top10/).
This additional steps ensures that the GPT is using the same source of definitiona as we expect it to use.

This custom GPT is publicly available on [ChatGPT](https://chatgpt.com/g/g-qPvRd1mhr-cyber-analyst).


# Code Snippets

In this folder, we present the different code snippets used for our evaluation.
These code snippets are sorted by language and if they contain OWASP TOP10 vulnerabilities.
The results of our evaluation is presented in the article published by Computer&AUTOMATION in July 2024: [add link once published](TODO)