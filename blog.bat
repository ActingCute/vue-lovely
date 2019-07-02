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

set str=%date%
 
set str_a=!str!
set str_b=!str!

echo %str%

rem 创建目录
echo %~dp0\cute\Blog\%str%

set folder=%~dp0\cute\Blog\%str%
set folder=%folder:/=%
set folder=%folder: =%
set now=%time::=%
set now=%now:.=%
set blogfolder=%folder%\%now%
set blogfolder=%blogfolder: =%

echo %blogfolder%

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

