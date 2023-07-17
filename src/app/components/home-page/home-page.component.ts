import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TriviaService} from "../../services/trivia.service";

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

  categoriesList: string[];
  menuOpened = false;

  constructor(
    private triviaService: TriviaService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCategories()
  }
  onSubmitCategory(): void {
    this.categorySubmitted.emit(this.selectedCategory)
  }

  onViewPrevScores(): void {
    this.goToScores.emit();
  }

  private loadCategories(): void {
    this.triviaService.getTheListOfCategories()
      .subscribe(categories => {
        this.categoriesList = categories;
        this.cd.detectChanges();
      })
  }

}
