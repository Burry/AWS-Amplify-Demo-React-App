# AWS Amplify Demo App

A demonstration of how to use the [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli) to configure AWS cloud resources and the [AWS Amplify](https://github.com/aws-amplify/amplify-js) NPM module to interface between AWS and a React app

**[Example »](http://amplifytest-20181102200157--hostingbucket.s3-website-us-west-2.amazonaws.com/)**

## How to Use

1. **You’ll need to have Node ≥ 8 and Yarn on your local development machine**. [Installing Yarn](https://yarnpkg.com/en/docs/install) will also install Node if it doesn't already exist in your environment.

2. [Clone](https://github.com/Burry/AWS-Amplify-Demo-React-App/archive/master.zip) and enter the repository with a terminal.

2. Run `yarn` to install the demo project's dependencies.

3. Run `npm i -g @aws-amplify/cli` to install the AWS Amplify CLI globally.

4. Run `amplify configure` to configure the AWS Amplify CLI for your local development environment, create a new IAM user for the Amplify CLI, and install an IAM profile and credentials in `~/.aws`.

5. Run `amplify init` to initialize the AWS Amplify CLI for the demo project and create initial AWS cloud resources. Choose your editor, and use the default options for the rest of the settings. Choose the AWS profile that you created with `amplify configure`.

6. Create the required AWS backend resources by running `amplify add <category-name>` to launch into a configuration wizard. You can list the available categories of cloud services with `amplify categories`.

7. Run `amplify push` to provision AWS resources in the cloud and add the `aws-exports.js` file to the `/src` directory. The application will crash without this file.

8. Run `yarn start` to build the app for a development environment and open a browser window with the local web server at [http://localhost:3000](http://localhost:3000). The page will automatically reload as you make changes to the code.

9. After developing the application to your liking and having added S3 hosting through `amplify add hosting`, run `amplify publish` to publish the static site build to S3 and provision AWS resources in the cloud. This will also create or update `aws-exports.js`.

## More Information

###### `amplify help`
###### [High-Level CLI Overview](https://aws-amplify.github.io/media/toolchain)
###### [AWS Amplify CLI Getting Started Guide](https://aws-amplify.github.io/docs/js/start)
###### [AWS Amplify CLI Announcement](https://aws.amazon.com/blogs/mobile/announcing-the-aws-amplify-cli-toolchain/)
###### [Create React App](https://github.com/facebook/create-react-app)

## Note

[AWS Amplify](https://github.com/aws-amplify/amplify-js) (or Amplify.js) and [AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli) are different, but related software projects. The CLI is used for automated AWS cloud resource configuration and deployment, and it exports a file `aws-exports.js` that is used by the single-page application to configure Amplify.js. Amplify.js provides a declarative interface to AWS services from the single-page application.
