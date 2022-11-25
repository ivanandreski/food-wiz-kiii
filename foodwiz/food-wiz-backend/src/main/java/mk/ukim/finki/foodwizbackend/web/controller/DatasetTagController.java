package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import mk.ukim.finki.foodwizbackend.service.DatasetTagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/datasetTag")
@CrossOrigin
public class DatasetTagController {

    private DatasetTagService datasetTagService;

    public DatasetTagController(DatasetTagService datasetTagService) {
        this.datasetTagService = datasetTagService;
    }

    // todo:
    // /datasetTag/?datasets
    // get
    // vidi sho tocno e ova
    @GetMapping
    public Map<String, List<DatasetTag>> getTags(@RequestParam String datasets) {
        return datasetTagService.getAll(datasets);
    }

    // /dataset/{tagId}
    // put

    // /dataset/markDelete/{tagId}
    // put
    // vidi shto e ova
}
