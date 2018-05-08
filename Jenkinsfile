#!groovy
// TODO: this is a copy from the red cow jenkins file, rework this!
boolean canRelease = BRANCH_NAME == 'master'

if (canRelease)
properties([
  parameters([
    booleanParam(
      name: 'isRelease',
      defaultValue: false,
      description: 'Select if you want to do a release build.'
    ),
    choice(
      name: 'versionIncrement',
      choices: 'major\nminor\npatch\npremajor\npreminor\nprepatch\nprerelease',
      defaultValue: 'prerelease',
      description: 'For a release, specify how the version number should be incremented'
    ),
  ])
])

//String triggerCron = BRANCH_NAME == "master" ? "H 13 * * 7" : ""
//properties([
//  [
//    $class: 'BuildDiscarderProperty',
//    strategy: [$class: 'LogRotator', numToKeepStr: '5']
//  ],
//  pipelineTriggers([
//    cron(triggerCron)
//  ])
//])

node {
  try {
    env.JAVA_HOME = tool 'jdk1.8.0_121';
    def mvnHome = tool "apache-maven-3.2.5";
    env.PATH = "${env.JAVA_HOME}\\bin;${env.PATH};${mvnHome}\\bin;${env.NODEJS_PATH}\"";
    env.SASS_BINARY_PATH = env.SASS_BINDING_PATH

    boolean shouldRelease = canRelease && params.isRelease

    stage('checkout') {
      checkout scm
    }

    stage('install') {
      bat 'node -v'
      bat 'yarn -v'
      bat 'yarn install'
    }

    stage('verify') {
      parallel(
        'test': {
          bat 'yarn ng test --watch false'
        },
        'lint': {
          bat 'yarn ng lint'
        }
      )
    }

//    if (shouldRelease) {
//      stage('increment version') {
//        bat "yarn release:version --yes --cd-version ${params.versionIncrement}"
//        bat "git push origin ${BRANCH_NAME} && git push origin --tags"
//      }
//    }
//
//    stage('build packages') {
//      bat 'yarn build:packages'
//      archive 'dist\\*.tgz'
//    }
//
//    if (shouldRelease) {
//      stage('publish release') {
//        bat "yarn release:publish"
//      }
//    }

  }catch(anyException) {
    echo "An error occured (${anyException}) marking build as failed."
    currentBuild.result = 'FAILURE'
  } finally {
    stage ("Publish results") {
      step([$class: "JUnitResultArchiver", testResults: "**/target/surefire-reports/*.xml"])

      // Methode from shared library
      buildReports()
    }

    notifyBuildStatus()
    deleteDir()
  }
}// node

def notifyBuildStatus() {
  // notify the person who started the build and the persons who's commits broke the build
  step([$class: 'Mailer',
        notifyEveryUnstableBuild: true,
        recipients: emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
        ])
  ])

  step([$class: 'Mailer',
        notifyEveryUnstableBuild: true,
        sendToIndividuals: true
  ])
}
