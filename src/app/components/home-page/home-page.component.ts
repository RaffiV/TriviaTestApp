import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TriviaService} from "../../services/trivia.service";
import {Observable} from "rxjs";

/*
* Component is responsible for selecting submitting a category to start a quiz
* Component also provides a capability to go to the previous scores page.
* */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  @Output() categorySubmitted = new EventEmitter();
  @Output() goToScores = new EventEmitter();

  title = 'Trivia App';
  text = 'Pick a Category';

  selectedCategory = '';

  categoriesList: Observable<string[]>;
  menuOpened = false;

  constructor(
    private triviaService: TriviaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.categoriesList = this.triviaService.getTheListOfCategories()
  }
  onSubmitCategory(): void {
    this.categorySubmitted.emit(this.selectedCategory)
  }

  onViewPrevScores(): void {
    this.goToScores.emit();
  }

}
