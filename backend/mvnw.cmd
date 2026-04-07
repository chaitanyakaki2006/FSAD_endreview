@REM ----------------------------------------------------------------------------
@REM Maven Wrapper for Windows
@REM Download and run Maven
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set MAVEN_VERSION=3.9.13
set MAVEN_URL=https://dlcdn.apache.org/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip
set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\apache-maven-%MAVEN_VERSION%

if exist "%MAVEN_HOME%\bin\mvn.cmd" goto runMaven

echo Maven not found. Downloading Maven %MAVEN_VERSION%...
mkdir "%USERPROFILE%\.m2\wrapper" 2>nul

powershell -Command "Invoke-WebRequest -Uri '%MAVEN_URL%' -OutFile '%TEMP%\maven.zip'"
powershell -Command "Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%USERPROFILE%\.m2\wrapper' -Force"
del "%TEMP%\maven.zip" 2>nul

:runMaven
"%MAVEN_HOME%\bin\mvn.cmd" %*
