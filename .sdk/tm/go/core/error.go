package core

type FreeMusicApi2Error struct {
	IsFreeMusicApi2Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeMusicApi2Error(code string, msg string, ctx *Context) *FreeMusicApi2Error {
	return &FreeMusicApi2Error{
		IsFreeMusicApi2Error: true,
		Sdk:              "FreeMusicApi2",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeMusicApi2Error) Error() string {
	return e.Msg
}
