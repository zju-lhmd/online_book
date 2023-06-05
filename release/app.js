// Author: Wang Weijie
// 本文件为服务器端主文件，使用koa框架，使用sequelize连接数据库

// koa框架使用的中间件
const koa = require('koa')
const path = require('path');
const static_file = require('koa-static')
const Router=require('koa-router')
const bodyParser = require('koa-body')
const Sequelize = require('sequelize')
const {Op} = require("sequelize");
const router= new Router()
const app = new koa()

// 连接数据库
const sequelize = new Sequelize('online_book', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 1000,
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
    address: {
        type: Sequelize.STRING(63),
        allowNull: false
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
    phone: {
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
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
    }
},{
    timestamps: false,
    freezeTableName:true
});
Plane.sync({force:false})

const BookingHistory = sequelize.define('booking_history', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    },
    start_time: {
        type: Sequelize.DATE
    },
    end_time: {
        type: Sequelize.DATE
    },
    order_no: {
        type: Sequelize.STRING(63)
    }
},{
    timestamps: false,
    freezeTableName:true
});
BookingHistory.sync({force:false})

const Comments = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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

const Goods = sequelize.define('goods', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    good_id: {
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
    category: {
        type: Sequelize.STRING(63),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sale: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: Sequelize.STRING(511),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});
Comments.sync({force:false})

app.use(async (ctx, next) => {
    await bodyParser()(ctx, next);
});
app.use(router.routes())
const cors=require("koa2-cors")
app.use(cors());
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


router.post('/hotel_search', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body)
        const whereClause = {};
        if (body.hotel_name) {
            whereClause.name = {
                [Op.like]: '%' + body.hotel_name + '%'
            };
        }
        if (body.location) {
            whereClause.location = {
                [Op.like]: '%' + body.location + '%'
            };
        }
        let hotel = await Hotel.findAll({
            where: whereClause
        });
        let room_min_price = [];
        for (let i = 0; i < hotel.length; i++) {
            let room = await Room.findAll({
                where: {
                    hotel_id: hotel[i].hotel_id
                }
            });
            let min_price = 1000000;
            for (let j = 0; j < room.length; j++) {
                if (room[j].price < min_price) {
                    min_price = room[j].price;
                }
            }
            room_min_price.push(min_price);
        }
        ctx.body = {
            hotel: hotel,
            room_min_price: room_min_price
        };
        console.log(ctx.body.hotel);
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
        ctx.body = {
            hotel: hotel,
            room: room,
            score: score,
            comments: comments
        }
        console.log(ctx.body)
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_hotel_detail error');
    }
});

router.post('/plane_search', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        // const whereClause = {};
        // if (body.start_location) {
        //     whereClause.start = {
        //         [Op.like]: '%' + body.start_location + '%'
        //     };
        // }
        // if (body.end_location) {
        //     whereClause.end = {
        //         [Op.like]: '%' + body.end_location + '%'
        //     };
        // }
        // if (body.company) {
        //     whereClause.company = {
        //         [Op.like]: '%' + body.company + '%'
        //     };
        // }
        // if (body.date) {
        //     whereClause.start_time = {
        //         [Op.gte]: body.date
        //     };
        // }
        // const planes = await Plane.findAll({
        //     where: whereClause
        // });
        console.log(body)
        if(body.date){
            console.log(1)
            const planes=await Plane.findAll({
                where:{
                    [Op.and]:[{
                        [Op.or]:[
                            {start: body.start_location==='' ? {[Op.eq]:''}:{[Op.eq]:body.start_location}},
                            {end: body.end_location==='' ? {[Op.eq]:''}:{[Op.eq]:body.end_location}}
                        ]
                    },
                    {company:{[Op.like]:'%'+body.company+'%'} },
                    {start_time:{[Op.gte]:body.date}}
                ]
                }
            });
            console.log(planes);
            ctx.body = planes;
            await next();
        }else{
            const planes=await Plane.findAll({
                where:{
                    [Op.and]:[{
                        [Op.or]:[
                            {start: body.start_location==='' ? {[Op.eq]:''}:{[Op.eq]:body.start_location}},
                            {end: body.end_location==='' ? {[Op.eq]:''}:{[Op.eq]:body.end_location}}
                        ]
                    },
                    {company:{[Op.like]:'%'+body.company+'%'} }
                ]
                }
            });
            console.log(planes);
            ctx.body = planes;
            await next();
        }
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
                association: BookingHistory.belongsTo(Plane, { foreignKey: 'plane_id' }),
                // model: Plane,
                as: 'Plane', // 设置别名为 'Plane'
                required: true
            }]
        });

        for (const booking of booking_history) {
            if (nowTime > booking.end_time && booking.state === 0) {
                booking.state = 1;
                await booking.save();
            }
        }

        // console.log(result);
        ctx.body = booking_history;
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_plane_booking_history error');
    }
});

router.post('/get_hotel_booking_history', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        // console.log(body);

        const nowTime = new Date();

        const booking_history = await BookingHistory.findAll({
            where: {
                user_id: body.user,
                type: 'hotel'
            },
            include: [{
                association: BookingHistory.belongsTo(Hotel, { foreignKey: 'hotel_id' }),
                as: 'Hotel', // 设置别名为 'Hotel'
                required: true
            }]
        });

        for (const booking of booking_history) {
            if (nowTime > booking.end_time && booking.state === 0) {
                booking.state = 1;
                await booking.save();
                // console.log(booking);
            }
        }

        console.log(booking_history[0].hotel);
        ctx.body = booking_history;
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
            // const count = await Hotel.count();
            // console.log(count);
            hotel = await Hotel.create({
                // hotel_id: count + 1,
                name: body.hotel.name,
                location: body.hotel.location,
                phone: body.hotel.phone,
                star_rating: parseInt(body.hotel.star),
                score_total: 0,
                score_count: 0,
                discount: parseInt(body.hotel.discount),
                description: body.hotel.description
            });
        } else {
            hotel = await Hotel.update({
                hotel_id: parseInt(body.hotel.hotel_id),
                name: body.hotel.name,
                location: body.hotel.location,
                phone: body.hotel.phone,
                star_rating: parseInt(body.hotel.star),
                score_total: parseInt(body.hotel.overall_ratings),
                score_count: parseInt(body.hotel.rator_number),
                discount: parseInt(body.hotel.discount),
                description: body.hotel.description
            }, {
                where: {
                    hotel_id: parseInt(body.hotel.hotel_id)
                }
            });
            hotel=body.hotel;
            await Room.destroy({
                where: {
                    hotel_id: parseInt(body.hotel.hotel_id)
                }
            });
        }
        const rooms = body.rooms;
        console.log(hotel.hotel_id)
        for (const room of rooms) {
            await Room.create({
                hotel_id: parseInt(hotel.hotel_id),
                type: room.type,
                price: parseInt(room.price),
                stock: parseInt(room.stock)
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

// plane history的endtime需要同步到booking_history表里面
router.post('/add_plane', async (ctx, next) => {
try {
        const body = ctx.request.body;
        console.log(body);
        console.log(body.company);
        let plane;

        if(body.plane_id === -1) {
            // const count = await Plane.count();
            // console.log(count);
            plane = await Plane.create({
                // plane_id: count + 1,
                company: body.company,
                start: body.start_location,
                end: body.end_location,
                start_time: body.start_time,
                end_time: body.end_time,
                price: parseInt(body.price),
                stock: parseInt(body.stock),
                discount: parseInt(body.discount)
            });
        } else {
            plane = await Plane.update({
                plane_id: parseInt(body.plane_id),
                company: body.company,
                start: body.start_location,
                end: body.end_location,
                start_time: body.start_time,
                end_time: body.end_time,
                price: parseInt(body.price),
                stock: parseInt(body.stock),
                discount: parseInt(body.discount)
            }, {
                where: {
                    plane_id: body.plane_id
                }
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
                hotel_id: parseInt(body.hotel_id)
            }
        });
        console.log(hotel)
        if (hotel) {
            await Room.destroy({
                where: {
                    hotel_id: parseInt(body.hotel_id)
                }
            });
            console.log(1)
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
                plane_id: parseInt(body.plane_id)
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

router.post('/search_good', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        let good;
        good = await Goods.findAll({
            where: {
                name: {
                    [Op.like]: '%' + body.name + '%'
                },
                category: {
                    [Op.like]: '%' + body.category + '%'
                }
            }
        });
        console.log(good);
        ctx.body = good;

        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('search_good error');
    }
});

router.post('/add_good', async (ctx, next) => {
    try {
        const body = ctx.request.body.data;
        console.log(body);

        let good;
        if(body.good_id === -1) {
            // const count = await Goods.count();
            // console.log(count);
            console.log(body.name)
            good = await Goods.create({
                user_id: parseInt(ctx.request.body.user_id),
                // good_id: count + 1,
                name: body.name,
                category: body.category,
                location: body.location,
                sale: 0,
                price: parseInt(body.price),
                stock: parseInt(body.stock),
                discount: parseInt(body.discount),
                description: body.description
            });
        } else {
            good = await Goods.update({
                user_id: parseInt(ctx.request.body.user_id),
                good_id: parseInt(body.good_id),
                name: body.name,
                category: body.category,
                location: body.location,
                sale: parseInt(body.sales),
                price: parseInt(body.price),
                stock: parseInt(body.stock),
                discount: parseInt(body.discount),
                description: body.description
            }, {
                where: {
                    good_id: parseInt(body.good_id)
                }
            });
        }
        console.log(good);
        ctx.body = 'success';
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('add_good error');
    }
});

router.post('/delete_good', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        const good = await Goods.findOne({
            where: {
                good_id: body.good_id,
                user_id: body.user_id
            }
        });

        if (good) {
            await good.destroy();
            ctx.body = 'success';
        } else {
            ctx.body = 'no such good';
        }

        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('delete_good error');
    }
});

router.post('/get_seller_goods', async (ctx, next) => {
    try {
        const body = ctx.request.body;
        console.log(body);

        let good;
        good = await Goods.findAll({
            where: {
                user_id: body.user_id
            }
        });
        console.log(good);
        ctx.body = good;
        await next();
    } catch (e) {
        ctx.body = 'error';
        console.log('get_seller_goods error');
    }
});

// 静态文件使用
// app.use(static_file(path.join(__dirname, 'static')));
app.use(router.allowedMethods())
app.listen(3400)
// console.log('success')