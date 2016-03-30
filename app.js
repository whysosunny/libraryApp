var express = require('express');
var app = express();
var bookRouter = express.Router();

var port = 5000;

app.use(express.static('public'));
app.set('views','src/views');
app.set('view engine','ejs');

app.use('/books', bookRouter);

var books = [
    {
        'title': 'Thinking Fast and Slow',
        'year': 1992,
        'rating': 9.2
    },
    {
        'title': 'Interaction of Color',
        'year': 1993,
        'rating': 8.2
    },
    {
        'title': 'Designing Everyday Things',
        'year': 2009,
        'rating': 8.7
    },
    {
        'title': 'Half Brother',
        'year': 2012,
        'rating': 8.9
    }
];

bookRouter.route('/').get(function(req,res) {
    res.render('books', {
        title: 'Books',
        nav: [{
            Link: '/books',
            Text: 'Books'
        },
        {
            Link: '/authors',
            Text: 'Authors'
        }],
        books: books
    });
});

bookRouter.route('/singleBook').get(function(req,res) {
    res.send('this is a single book yo!');
});

app.get('/', function(req,res) {
    res.render('index',{
        title: 'Hello from render',
        nav: [{Link: '/books', Text: 'Books'},
            {Link: '/authors', Text: 'Authors'}]});
});

app.listen(port, function() {
    console.log('Running the server yo! Port: %s', port);
});
