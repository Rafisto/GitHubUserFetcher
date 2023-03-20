import secrets

class Token:
    @staticmethod
    def generate_token():
        return secrets.token_hex(32)
