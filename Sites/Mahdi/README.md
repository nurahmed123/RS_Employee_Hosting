
# 🚀 Jetsu | Hack Club

Jetsu is a **YSWS Robotics Program** where participants receive funding to build AI-powered robots. To participate, follow the steps below and document your progress in this repository.

----------

## 📂 Project Setup

To get started, run:

```bash
git clone 
cd Jetsu
npm i && npm run dev
```



## 🛠 Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── robots/   # Participants add their robot logs here
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json

```

### 📁 **Adding Your Robot Documentation**

Each participant must add a README file for their robot inside:

```
src/content/docs/robots/

```

The file should be named after your robot, like:

```
src/content/docs/robots/my-awesome-robot.md

```

### 📌 **README Format**

Your README should include:

```md
# 🤖 [Robot Name]  

## 📌 Project Overview  
- **GitHub Repo:** [Your GitHub Repository URL]  
- **Description:** A brief summary of your robot and its purpose.  

## 🛠 Components Used (BOM)  
- List the hardware components you used (budget under $100).  

## 🧠 Machine Learning Approach  
- Explain the ML model you used and how it controls your robot.  

## 📊 Time Log  
| Date       | Hours Spent | Work Summary |
|------------|------------|--------------|
| YYYY-MM-DD | X hrs      | Description  |
| YYYY-MM-DD | X hrs      | Description  |

## 🎯 Progress & Future Improvements  
- Document what has been completed and what you plan to improve.  

## 📸 Images / Videos  
- Embed any images or videos of your robot in action.  


```

----------

## 📢 **How to Submit Your Robot**

1.  **Fork** this repository.
    
2.  Add a Markdown file inside `src/content/docs/robots/` with your robot’s details.
    
3.  **Commit** and **push** your changes.
    
4.  Create a **Pull Request** (PR) with the title:
    
    ```
    Add [Robot Name] - [Your Name]
    
    ```
    
5.  Wait for approval and feedback! 🎉
    

----------



## 🚀 Running the Project Locally

```sh
npm install      # Install dependencies  
npm run dev      # Start local dev server at localhost:4321  
npm run build    # Build your production site  
npm run preview  # Preview your build before deploying  

```

