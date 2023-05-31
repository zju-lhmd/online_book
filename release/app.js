// Author: Wang Weijie
// 本文件为服务器端主文件，使用koa框架，使用sequelize框架连接数据库

// koa框架使用的中间件
const koa = require('koa')
const path = require('path');
const static_file = require('koa-static')
const Router=require('koa-router')
const bodyParser = require('koa-body')
const Sequelize = require('sequelize')
const { prompt } = require('message-box');
const { success, info } = require('message');
const {Op} = require("sequelize");
const router= new Router()
const app = new koa()

// 连接数据库
const sequelize = new Sequelize('online_book', 'root', 'qwe987', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 500,
        min: 0,
        idle: 30000
    }
});

// 定义数据库表
const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    credit: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    is_admin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    timestamps: false,
    freezeTableName:true
});
User.sync({force:false})

const Hotel = sequelize.define('hotel', {
    hotel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    location: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    star_rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    score_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    score_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 1.0
    },
    description: {
        type: Sequelize.STRING(511),
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName:true
});
Hotel.sync({force:false})

const Room = sequelize.define('room', {
    hotel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'hotel',
            key: 'hotel_id'
        }
    },
    type: {
        type: Sequelize.STRING(63),
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    timestamps: false,
    freezeTableName:true
});
Room.sync({force:false})

const Plane = sequelize.define('plane', {
    plane_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    start_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    start: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    end: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
    },
    discount: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 1.0
    }
},{
    timestamps: false,
    freezeTableName:true
});
Plane.sync({force:false})

const BookingHistory = sequelize.define('booking_history', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    has_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    hotel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
        references: {
            model: 'hotel',
            key: 'hotel_id'
        }
    },
    type: {
        type: Sequelize.STRING(63)
    },
    plane_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
        references: {
            model: 'plane',
            key: 'plane_id'
        }
    }
},{
    timestamps: false,
    freezeTableName:true
});
BookingHistory.sync({force:false})

const Comments = sequelize.define('comments', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    comment_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hotel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
        references: {
            model: 'hotel',
            key: 'hotel_id'
        }
    },
    content: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName:true
});
Comments.sync({force:false})

app.use(async (ctx, next) => {
    await bodyParser()(ctx, next);
});
app.use(router.routes())

router.post('/hotel_search', async (ctx, next) => {
    try{
        const body = ctx.request.body
        // console.log(body)
        // console.log(hotel)
        ctx.body = await Hotel.findAll({
            where: {
                name: {
                    [Op.like]: '%' + body.hotel_name + '%'
                },
                location: {
                    [Op.like]: '%' + body.location + '%'
                }
            }
        })
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('hotel_search error');
    }
});

router.post('/get_hotel_detail', async (ctx, next) => {
    try{
        const body = ctx.request.body
        // console.log(body)
        const hotel = await Hotel.findOne({
            where: {
                hotel_id: body.hotel_id
            }
        })
        const room = await Room.findAll({
            where: {
                hotel_id: body.hotel_id
            }
        });
        const score = hotel.score_count === 0 ? 0 : hotel.score_total / hotel.score_count
        const comments = await Comments.findAll({
            where: {
                hotel_id: body.hotel_id
            }
        });
        // console.log(hotel)
        ctx.body = {
            hotel: hotel,
            room: room,
            score: score,
            comments: comments
        }
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_hotel_detail error');
    }
});

router.post('/plane_search', async (ctx, next) => {
    try{
        const body = ctx.request.body
        // console.log(body)
        ctx.body = await Plane.findAll({
            where: {
                start: {
                    [Op.like]: '%' + body.start_location + '%'
                },
                end: {
                    [Op.like]: '%' + body.end_location + '%'
                },
                company: {
                    [Op.like]: '%' + body.company + '%'
                },
                start_time: {
                    [Op.gte]: body.date
                }
            }
        })
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('plane_search error');
    }
});

// 还有问题，需要修改
router.post('/get_plane_booking_history', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const nowTime = new Date();

        const booking_history = await BookingHistory.findAll({
            where: {
                user_id: body.user,
                type: 'plane'
            },
            include: [{
                model: Plane,
                as: 'Plane', // 设置别名为 'Plane'
                required: true
            }]
        });

        for (const booking of booking_history) {
            if (nowTime > booking.Plane.end_time && booking.state === 0) {
                booking.state = 1;
                await booking.save();
            }
        }

        const result = booking_history.map(booking => {
            const { user_id, state, has_score, hotel_id, type, plane_id, Plane } = booking;
            const { company, start_time, end_time, start, end, price, discount } = Plane;

            return {
                user_id,
                state,
                has_score,
                hotel_id,
                type,
                plane_id,
                company,
                start_time,
                end_time,
                start,
                end,
                price,
                discount
            };
        });

        console.log(result);
        ctx.body = result;
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_plane_booking_history error');
    }
});

// 还有问题，需要修改, 与上面的函数类似
router.post('/get_hotel_booking_history', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const nowTime = new Date();

        const booking_history = await BookingHistory.findAll({
            where: {
                user_id: body.user,
                type: 'hotel'
            },
            include: [{
                model: Hotel,
                as: 'Hotel', // 设置别名为 'Hotel'
                required: true
            }]
        });

        for (const booking of booking_history) {
            if (nowTime > booking.Hotel.end_time && booking.state === 0) {
                booking.state = 1;
                await booking.save();
            }
        }

        const result = booking_history.map(booking => {
            const { user_id, state, has_score, hotel_id, type, plane_id, Hotel } = booking;
            const { name, location, start_time, end_time, price, discount } = Hotel;

            return {
                user_id,
                state,
                has_score,
                hotel_id,
                type,
                plane_id,
                name,
                location,
                start_time,
                end_time,
                price,
                discount
            };
        });

        console.log(result);
        ctx.body = result;
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_hotel_booking_history error');
    }
});

router.post('/comment_submit', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const comment = await Comments.create({
            user_id: body.user,
            hotel_id: body.hotel_id,
            content: body.comment,
            comment_time: new Date()
        });

        console.log(comment);
        ctx.body = 'success';
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('comment_submit error');
    }
});

router.post('/score_submit', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const booking_history = await BookingHistory.findOne({
            where: {
                user_id: body.user,
                hotel_id: body.hotel_id,
                state: 0
            }
        });

        if (booking_history) {
            booking_history.has_score = 1;
            await booking_history.save();
        }

        const hotel = await Hotel.findOne({
            where: {
                id: body.hotel_id
            }
        });

        if (hotel) {
            const score_total = hotel.score_total + body.score;
            const score_count = hotel.score_count + 1;
            await hotel.update({
                score_total,
                score_count
            });
        }

        console.log(score);
        ctx.body = 'success';
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('score_submit error');
    }
});

router.post('/add_hotel', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);
        let hotel;

        if(body.hotel.hotel_id === -1) {
            hotel = await Hotel.create({
                hotel_id: body.hotel.hotel_id,
                name: body.hotel.name,
                location: body.hotel.location,
                star_rating: body.hotel.star,
                score_total: 0,
                score_count: 0,
                discount: body.hotel.discount,
                description: body.hotel.description
            });
        } else {
            hotel = await Hotel.update({
                hotel_id: body.hotel.hotel_id,
                name: body.hotel.name,
                location: body.hotel.location,
                star_rating: body.hotel.star,
                score_total: 0,
                score_count: 0,
                discount: body.hotel.discount,
                description: body.hotel.description
            });
        }

        const rooms = body.hotel.rooms;
        for (const room of rooms) {
            await Room.create({
                hotel_id: hotel.hotel_id,
                type: room.type,
                price: room.price,
                stock: room.stock
            });
            console.log(room);
        }

        console.log(hotel);
        ctx.body = 'success';
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('add_hotel error');
    }
});

router.post('/add_plane', async (ctx, next) => {
try {
        const body = ctx.request.body;
        console.log(body);
        let plane;

        if(body.plane_id === -1) {
            plane = await Plane.create({
                plane_id: body.plane_id,
                company: body.company,
                start_time: body.start_time,
                end_time: body.end_time,
                start: body.start,
                end: body.end,
                price: body.price,
                discount: body.discount
            });
        } else {
            plane = await Plane.update({
                plane_id: body.plane_id,
                company: body.company,
                start_time: body.start_time,
                end_time: body.end_time,
                start: body.start,
                end: body.end,
                price: body.price,
                discount: body.discount
            });
        }

        console.log(plane);
        ctx.body = 'success';
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('add_plane error');
    }
});

router.post('/delete_hotel', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const hotel = await Hotel.findOne({
            where: {
                id: body.hotel_id
            }
        });

        if (hotel) {
            await Rooms.destroy({
                where: {
                    hotel_id: hotel.id
                }
            });

            await hotel.destroy();
            ctx.body = 'success';
        } else {
            ctx.body = 'no such hotel';
        }

        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('delete_hotel error');
    }
});

router.post('/delete_plane', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const plane = await Plane.findOne({
            where: {
                id: body.plane_id
            }
        });

        if (plane) {
            await plane.destroy();
            ctx.body = 'success';
        } else {
            ctx.body = 'no such plane';
        }

        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('delete_plane error');
    }
});

// 静态文件使用
app.use(static_file(path.join(__dirname, 'static')));
app.listen(3400)
// console.log('success')