import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Получаем значение из контрола
    const email: string = control.value;

    // Проверяем, есть ли символ "@"
    if (email && email.indexOf('@') !== -1) {
      // Разбиваем email на части по символу "@"
      const parts = email.split('@');

      // Получаем доменную часть (после символа "@")
      const domain = parts[1];

      // Проверяем, что доменное имя соответствует разрешенным значениям
      if (
        domain !== 'gmail.com' &&
        domain !== 'mail.ru' &&
        domain !== 'yandex.ru'
      ) {
        // Возвращаем ошибку, если доменное имя не соответствует разрешенным значениям
        return { invalidDomain: true };
      }
    }

    // Если все проверки пройдены, возвращаем null, что означает, что валидация прошла успешно
    return null;
  };
}
