@echo off

set /p token="Enter discord bot token: "
set /p prefix="Enter prefix: "
echo DISCORD_TOKEN=%token% > .env
echo COMMAND_PREFIX=^%prefix% >> .env

call npm install
call npm start

pause