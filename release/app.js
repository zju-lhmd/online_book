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
        // console.log(hotel)
        ctx.body = {
            hotel: hotel,
            room: room
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

        // for (const booking of booking_history) {
        //     if (nowTime > booking.Plane.end_time && booking.state === 0) {
        //         booking.state = 1;
        //         await booking.save();
        //     }
        // }

        // const result = booking_history.map(booking => {
        //     const { user_id, state, has_score, hotel_id, type, plane_id, Plane } = booking;
        //     const { company, start_time, end_time, start, end, price, discount } = Plane;
        //
        //     return {
        //         user_id,
        //         state,
        //         has_score,
        //         hotel_id,
        //         type,
        //         plane_id,
        //         company,
        //         start_time,
        //         end_time,
        //         start,
        //         end,
        //         price,
        //         discount
        //     };
        // });

        // console.log(result);
        // ctx.body = result;
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_plane_booking_history error');
    }
});


// 静态文件使用
app.use(static_file(path.join(__dirname, 'static')));
app.listen(3400)
// console.log('success')