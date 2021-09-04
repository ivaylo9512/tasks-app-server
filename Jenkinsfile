pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 30012:30012' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test-jenkins'
            }
            post {
                always {
                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/jest/cobertura-coverage.xml'])
                }
            }
        }
        // stage('Production') {
        //     steps {
        //         withAWS(region:'Bulgaria', credentials:'1k2fea34') {
        //             s3Delete(bucket: 'Tasks app', path:'**/*')
        //             s3Upload(bucket: 'Tasks app', workingDir:'build', includePathPattern:'**/*');
        //         }
        //     }
        // }
    }
}