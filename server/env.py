class Env:
    @staticmethod
    def get_oauth_client_secret():
        return open("env/github_oauth_client_secret.txt", "r").read()

    @staticmethod
    def get_oauth_client_id():
        return open("env/github_oauth_client_id.txt", "r").read()
