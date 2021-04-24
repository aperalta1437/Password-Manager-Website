def check_for_token(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
                token= request.args.get('token')
                if not token:
                        return jsonify({ 'message': "Missing token"}),403
                try:
                        data = jwt.decode(token, app.config['SECRET_KEY'])
                except:
                        return jsonify({'message': 'Invalid token'}),403
                return func(*args, **kwargs)
                        return wrapped