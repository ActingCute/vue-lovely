package models

import (
	helper "lovely/helper"
	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
	"time"
	"os"
)

var (
	ShowSql         bool     //是否显示sql日志
	db              *xorm.Engine
	ds              *xorm.Session
	DBOk            bool    //数据库连接是否正常
	Domain          string
)


func init() {
	//web
	Domain = GetAppConf("web::domain")
	helper.Debug("Domain :",Domain)
	//数据库
	dbHost := GetAppConf("db::host")
	daTable := GetAppConf("db::table")
	dbPort := GetAppConf("db::port")
	dbUser := GetAppConf("db::user")
	dbPassword := GetAppConf("db::password")
	ShowSql = GetAppConfBool("db::showsql")
	//若获取失败，则用默认值
	dbHost = If(len(dbHost) < 1, "127.0.0.1", dbHost).(string)
	daTable = If(len(daTable) < 1, "falcon_portal", daTable).(string)
	dbPort = If(len(dbPort) < 1, "3306", dbPort).(string)
	dbUser = If(len(dbUser) < 1, "root", dbUser).(string)
	dbPassword = If(len(dbPassword) < 1, "admin", dbPassword).(string)
	dataSourceName := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + daTable + "?charset=utf8&parseTime=true&loc=Local"
	go connentDB(dataSourceName)
}

func connentDB(dataSourceName string) {
	t1 := time.NewTimer(time.Second * 1)
	timer := 1
	for {
		select {
		case <-t1.C:
			timer++
			if timer > 15 {
				beego.Info("多次尝试连接数据库失败，请检查数据库配置信息！")
				break
			}
			beego.Debug("timer --- ", timer)
			var err error
			db, err = xorm.NewEngine("mysql", dataSourceName)
			if helper.Error(err) {
				beego.Error("1.数据库初始化失败 ----", err)
				t1.Reset(time.Second * 10)
				continue
			}
			err = db.Ping()
			if helper.Error(err) {
				beego.Error("2.数据库初始化失败 ----", err)
				t1.Reset(time.Second * 10)
				continue
			}
			maxOpenConns := GetAppConfInt("db::maxOpenConns")
			maxIdleConns := GetAppConfInt("db::maxIdleConns")
			db.SetMaxOpenConns(maxOpenConns)
			db.SetMaxIdleConns(maxIdleConns)

			db.ShowSQL(ShowSql)
			db.DatabaseTZ = time.Local
			db.TZLocation = time.Local
			// LRU 缓存
			//TODO: 调试时候关掉吧，客户端那边 。。。
			//cacher := xorm.NewLRUCacher(xorm.NewMemoryStore(), 10000)
			//db.SetDefaultCacher(cacher)
			DBOk = true
			//InitDB()
			if ShowSql {
				initDBLogger()
			} else {
				beego.Info("sql 日志已经关闭")
			}
			break
		}
	}
}

func initDBLogger() {
	t1 := time.NewTimer(time.Second * 1)
	logpath := "./Log/sql.log"
	go func(){
		for {
			select {
			case <-t1.C:
				beego.Info("初始化SQL日志 --- ok")
				if helper.IsExist(logpath) {
					f, err := os.OpenFile(logpath, os.O_RDWR, 0775)
					if helper.Error(err) {
						beego.Error("open sql log error:", err)
						return
					}
					os.Stdout = f
					logger := xorm.NewSimpleLogger(os.Stdout)
					db.SetLogger(logger)
					break
				} else {
					beego.Info("初始化SQL日志 --- ing")
					t1.Reset(time.Second * 5)
				}
			}
		}	
	}()
	
}

func If(condition bool, trueVal, falseVal interface{}) interface{} {
	if condition {
		return trueVal
	}
	return falseVal
}


func GetAppConf(name string) string {
	return beego.AppConfig.String(name)
}

func GetAppConfWithDefault(name, def string) (ret string) {
	ret = beego.AppConfig.String(name)
	if len(ret) == 0 {
		ret = def
	}
	return ret
}

func GetAppConfInt(name string) int {
	num, _ := beego.AppConfig.Int(name)
	return num
}

func GetAppConfInt64(name string) int64 {
	num, _ := beego.AppConfig.Int64(name)
	return num
}

func GetAppConfBool(name string) bool {
	isok, err := beego.AppConfig.Bool(name)
	if helper.Error(err) {
		isok = false
	}
	return isok
}