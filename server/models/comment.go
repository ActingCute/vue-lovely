package models

import (
	"time"
)

type Comment struct {
	Id         int       `xorm:"not null pk autoincr INT(64)" json:"id"`
	UserId     int       `xorm:"not null INT(64)" json:"user_id"`
	Url        string    `xorm:"not null VARCHAR(255)" json:"url"`
	FatherId   int       `xorm:"not null default 0 INT(64)" json:"father_id"`
	SonId      int       `xorm:"not null default 0 INT(64)" json:"son_id"`
	UpdateTime time.Time `xorm:"not null DATETIME" json:"update_time"`
	DeleteTime time.Time `xorm:"DATETIME" json:"delete_time"`
}

func AddComment(comment Comment) error {
	return Insert(comment)
}