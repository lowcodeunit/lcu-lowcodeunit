import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'lcu-enabled-toggle',
  templateUrl: './enabled-toggle.component.html',
  styleUrls: ['./enabled-toggle.component.scss'],
})
export class EnabledToggleComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties
  @Input('disabled-text')
  public DisabledText: string;

  public DisplayText: string;

  @Input('enabled')
  public Enabled: boolean;

  @Input('enabled-text')
  public EnabledText: string;

  @Input('enabling-text')
  public EnablingText: string;

  @ViewChild('enabledToggle')
  public EnabledToggle: MatSlideToggle;

  @Output('enabled-toggled')
  public EnabledToggled: EventEmitter<boolean>;

  //  Constructors
  constructor() {
    this.DisabledText = 'Disabled';

    this.EnabledText = 'Enabled';

    this.EnablingText = 'Enabling...';

    this.EnabledToggled = new EventEmitter();
  }

  //  Life Cycle
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.Enabled) {
      this.establishText();
    }
  }

  public ngOnInit(): void {}

  //  API Methods
  public ToggleEnabledChanged(event: MatSlideToggleChange) {
    this.EnabledToggled.emit(this.Enabled);

    this.establishText();
  }

  //  Helpers
  protected establishText() {
    this.DisplayText = this.Enabled ? this.EnabledText : this.DisabledText;

    if (
      this.EnabledToggle &&
      ((this.EnabledToggle.checked && this.DisplayText !== this.EnabledText) ||
        (!this.EnabledToggle.checked && this.DisplayText !== this.DisabledText))
    ) {
      this.DisplayText = this.EnablingText;
    }
  }
}
