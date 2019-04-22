// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"server/controllers"
	"github.com/astaxie/beego"
)

func init() {
	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/api",
			beego.NSInclude(
				&controllers.ApiController{},
			),
		),
		beego.NSNamespace("/count",
			beego.NSInclude(
				&controllers.CountController{},
			),
		),
		beego.NSNamespace("/comment",
			beego.NSInclude(
				&controllers.CommentController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
