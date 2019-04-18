@echo off 
setlocal enabledelayedexpansion 
chcp 65001
cls  

rem 检测输入标题，判断标题

for %%i in (%*) do (
set title=!title! %%i
)


if title=="" (
    set title="起个好名字好不"
)


rem win10和win7系统时间格式不一致，所以这里提取纯数字
set str=%date%
  
set str_a=!str!
set str_b=!str!
for /l %%a in (0,1,9) do set str_a=!str_a:%%a=!
call:calc !str_a!
set nt=!str_b!
goto creat
exit
 
:calc
set n=0
set "s=%~1"
:loop
set "t=!s:~%n%,1!"
if "%t%"=="" (
    set "str_b=!str_b:"=!"
    goto :eof
)
set "str_b=!str_b:%t%=!"
set /a n+=1
goto loop

:creat
rem 创建目录
set folder=%~dp0docs\Blog\%nt%
set folder=%folder:/=%
set folder=%folder: =%
set now=%time::=%
set now=%now:.=%
set blogfolder=%folder%\%now%

if not exist %folder% (
    md %folder%
)

if not exist %blogfolder% (
    md %blogfolder%
)

if not exist %blogfolder% (
    echo Failed to create folder
    exit
)

copy Template\post %blogfolder%
cd %blogfolder%

rem 写入模板，替换文件标题
set file=post
set file_tmp=post_tmp
set file_bak=post_bak
set source1=lovely

for /f "delims=" %%i in (%file%) do (
    set str=%%i
    set "str=!str:%source1%=%title%!"
    echo !str!>>%file_tmp%
)
move "%file_tmp%" "%file%"

ren post  README.md

