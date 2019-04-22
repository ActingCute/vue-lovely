package models

import (
	"time"
)

type Count struct {
	Id         int       `xorm:"not null pk autoincr INT(64)"`
	Url        int       `xorm:"not null INT(64)"`
	Count      int       `xorm:"not null INT(64)"`
	DeleteTime time.Time `xorm:"DATETIME"`
}
