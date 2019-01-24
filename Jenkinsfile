pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
        archiveArtifacts(artifacts: 'build', onlyIfSuccessful: true)
      }
    }
  }
}
