from spacy.lang.en import English

from app.repository.respository_api import TokenizerRepository, TokenWithStart


class SpacyTokenizerRepository(TokenizerRepository):

    def __init__(self):
        nlp = English()
        # Create a Tokenizer with the default settings for English
        # including punctuation rules and exceptions
        self.tokenizer = nlp.tokenizer

    def tokenize(self, text: str):
        tokens = self.tokenizer(text)
        print(type(tokens[0]))
        return [TokenWithStart(t.text_with_ws, t.idx) for t in tokens]
