module server

go 1.12

replace (
	golang.org/x/crypto => github.com/golang/crypto v0.0.0-20190418165655-df01cb2cc480
	golang.org/x/net => github.com/golang/net v0.0.0-20190420063019-afa5a82059c6
	golang.org/x/sync => github.com/golang/sync v0.0.0-20190412183630-56d357773e84
	golang.org/x/sys => github.com/golang/sys v0.0.0-20190419153524-e8e3143a4f4a
	golang.org/x/text => github.com/golang/text v0.3.0
)

require (
	github.com/astaxie/beego v1.11.1
	github.com/go-sql-driver/mysql v1.4.1
	github.com/go-xorm/xorm v0.7.1
)
