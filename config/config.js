const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
        return {
            app_port: 3002,
            db: 'myMongoDB',
            jwt_secret: '@_V3rY-S&cR&T_T0k3N',
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {
            app_port: 3003,
            db: 'myMongoDB',
            jwt_secret: '@_V3rY-S&cR&T_T0k3N',
            jwt_expires_in: '7d'
        }

        case 'prod':
        return {
            app_port: 3004,
            db: 'myMongoDB',
            jwt_secret: '@_V3rY-S&cR&T_T0k3N',
            jwt_expires_in: '7d'
        }
    }
}

console.log(`Starting the API in ${env.toUpperCase()} environment !!!`);

module.exports = config();