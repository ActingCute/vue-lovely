echo off
if not exist dist\html (
    echo no build file
    exit
)
 
cp .git %~dp0dist\html && cd %~dp0dist\html & git add . & git commit -m "back --" & git push -f https://github.com/ActingCute/vue-lovely.git cute