package mk.ukim.finki.foodwizbackend.domain.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 409
public class CorpusNotFoundException extends RuntimeException{
    public CorpusNotFoundException(long corpusId){
        super("Corpus " + corpusId + " does not exist.");
    }
}
