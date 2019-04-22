package models

type User struct {
	Id         int    `xorm:"not null pk autoincr INT(64)"`
	Website    string `xorm:"not null VARCHAR(255)"`
	Email      string `xorm:"not null VARCHAR(255)"`
	Name       string `xorm:"not null VARCHAR(255)"`
	DeleteTime int    `xorm:"INT(11)"`
}