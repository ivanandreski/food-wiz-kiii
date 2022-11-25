package mk.ukim.finki.foodwizbackend.domain.dto.out;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.foodwizbackend.domain.models.CorpusDataset;
import mk.ukim.finki.foodwizbackend.domain.models.Dataset;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DatasetsByCorpusDto {

    private List<Dataset> datasets;
    private String datasetString;

    public DatasetsByCorpusDto(List<CorpusDataset> datasets) {
        this.datasets = datasets.stream()
                .map(CorpusDataset::getDataset)
                .toList();
        StringBuilder sb = new StringBuilder();
        this.datasets.forEach(d -> sb.append(d.getId()).append(","));
        datasetString = sb.toString();
    }
}
