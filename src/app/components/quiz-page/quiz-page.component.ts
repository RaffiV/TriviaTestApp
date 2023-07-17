import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {TriviaService} from "../../services/trivia.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface Task {
  title: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  userAnswer: string;
  difficulty: string;
}

export interface Quiz {
  category: string;
  tasks: Task[];
  score: number;
}

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ display: 'none' })), // Initial state when the element is not present in the DOM
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class QuizPageComponent implements OnInit {
  @Input() category: string;
  @Input() completeQuiz: Quiz;
  @Output() backToPrevScores = new EventEmitter();
  @Output() backToHome = new EventEmitter();

  layoutTitle = '';
  layoutText = '';
  layoutLabel = '';
  activeTaskIndex: number = 0;
  currentQuiz: Quiz;

  constructor(
    private triviaService: TriviaService,
    private localStorage: LocalStorageService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.initQuiz();
  }

  selectAnswer(option: string): void {
    if (this.completeQuiz) return;
    this.currentQuiz.tasks[this.activeTaskIndex].userAnswer = option;
    this.submitAnswer();
  }

  submitAnswer(): void {
    this.activeTaskIndex++;
    if (this.activeTaskIndex === this.currentQuiz.tasks.length) {
      this.currentQuiz.score = this.currentQuiz.tasks.filter(t => t.userAnswer === t.correctAnswer).length;
      this.localStorage.addNewScore(this.currentQuiz);
    }
    this.setLayoutData();
  }

  reviewNextQuestion(): void {
    if (this.activeTaskIndex < this.completeQuiz.tasks.length - 1) {
      this.activeTaskIndex++;
      this.setLayoutData();
    }
  }

  reviewPrevQuestion(): void {
    if (this.activeTaskIndex > 0) {
      this.activeTaskIndex--;
      this.setLayoutData();
    }
  }

  // Private helpers
  private initQuiz(): void {
    if (this.completeQuiz) {
      this.currentQuiz = this.completeQuiz;
      this.setLayoutData()
      this.cd.detectChanges();
    }
    else {
      this.triviaService.loadQuizQuestions(this.category).subscribe(quizTasks => {
        this.currentQuiz = {
          category: this.category,
          tasks: quizTasks,
          score: 0
        }
        this.setLayoutData()
        this.cd.detectChanges();
      })
    }
  }

  private setLayoutData(): void {
    if (this.activeTaskIndex === 10) {
      this.layoutTitle = 'Thank You';
      this.layoutText = `Your score: ${this.currentQuiz.score} / ${this.currentQuiz.tasks.length}`;
      this.layoutLabel = null;
    } else {
      const task = this.currentQuiz.tasks[this.activeTaskIndex];
      this.layoutTitle = task.title;
      this.layoutText = task.question;
      this.layoutLabel = task.difficulty;
    }
  }
}
