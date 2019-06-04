echo off
if not exist dist\html (
    echo no build file
    exit
)
cd %~dp0dist\html & git add . & git commit -m "update --" & git push -f git@www.haibarai.com:/var/repo/blog.git lovely