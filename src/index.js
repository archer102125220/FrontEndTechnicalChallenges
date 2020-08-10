import dva from 'dva';
import './index.css';
import moment from 'moment';
moment.locale('zh-tw');

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/userList').default);

// 4. Router
// console.log(require('./router').default);
// console.log(app.router.toString());
app.router(require('./router').default);

// 5. Start
app.start('#root');
