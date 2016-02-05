import {Component, OnInit, Input} from 'angular2/core';
import {SebmGoogleMap} from 'angular2-google-maps/core';
import Region from '../models/region';

@Component({
    directives: [SebmGoogleMap],
    template: `
    <div id="map" data-role="page" class="page">
        <sebm-google-map [latitidue]="lat" [longitude]="lng" [zoom]="13">
            <sebm-google-map-marker [latitidue]="lat" [longitude]="lng" [title]="markerName"/>
        </sebm-google-map>
    </div>
`
})
export class MapView {
    public lat:Number;
    public lng:Number;
    public markerName:String;

    constructor(
        @Input() region:Region
    ) {
        this.lat = region.lat;
        this.lng = region.lon;
        this.markerName = "Region " + region.number;
    }
}
