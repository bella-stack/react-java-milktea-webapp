[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/apcvbojB)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12509762&assignment_repo_type=AssignmentRepo)

### Setup Instructions

1. **Install Maven**: Follow the official [Maven installation guide](https://maven.apache.org/install.html).

#### VSCode Extensions:
- **Spring Boot Extension Pack**: Provides support for running and debugging Spring Boot applications.
- **Java Extension Pack**: Offers Java language support, debugging capabilities, and more.
- **Maven for Java**: Assists in handling Maven projects within VSCode.

2. **Set up `pom.xml`**: Ensure that your project's `pom.xml` is configured with the necessary dependencies.

3. **Configure Database in `resources/application.yml`**:
    - Update the file with your specific database credentials, or it would conflict with your local pg-database.
    - **Important**: Add `application.yml` to your `.gitignore` file to prevent overwriting other team members' credentials.
    - Ensure that you've pulled the latest .gitignore file. Please refrain from pushing compiled WAR files or other output files to the repository

### How to Build and Run:

1. Make sure your database proxy is on.
2. Navigate to the root of `pos-webapp`.
3. Execute command: 1. for rebuilding: `mvn clean install` 2. for running: `mvn spring-boot:run`.
4. Navigate to the root of `pos-webapp-frontend`.
5. Make sure to install any dependencies or packages with `npm i` or `npm install`.
6. Execute the command: 1. for rebuilding: `npm run build` 2. for running: `npm start`.

#### Check the Backend Application at port 8080:

- Visit [http://localhost:8080](http://localhost:8080). It should display "hello world".
- Visit [http://localhost:8080/api/inventory/in_16](http://localhost:8080/api/inventory/in_16). Expected output: `{"id":"in_16","name":"peach_syrup","quantity":196863,"cost":0.1,"price":0.0,"isaddon":false}`

#### Check the Frontend Application at port 3000:

- Visit [http://localhost:3000](http://localhost:3000). It should display the whole inventory table items.
- ![Screenshot 2023-10-23 at 9 35 23 PM](https://github.com/csce-315-331-2023c/project-3-902_02r/assets/122915726/4ffff3f8-3568-475e-a96c-affb9eb59ebb)
