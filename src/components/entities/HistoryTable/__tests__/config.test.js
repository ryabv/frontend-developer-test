import { ORDER_BY } from '../../../../constants/tables';
import { dateComparator } from '../config';

describe('dateComparator', function () {
  const setUp = (order) => ['2020-02-14', '2020-02-16', '2020-02-15'].sort(dateComparator(order));

  it('returns data in chronological order if asc is passed', () => {
    const result = setUp(ORDER_BY.ASC);
    const expected = ['2020-02-14', '2020-02-15', '2020-02-16'];
    expect(result).toStrictEqual(expected);
  });

  it('returns data in reverse chronological order if desc is passed', () => {
    const result = setUp(ORDER_BY.DESC);
    const expected = ['2020-02-16', '2020-02-15', '2020-02-14'];
    expect(result).toStrictEqual(expected);
  });

  it('does not reorder if nothing is passed', () => {
    const result = setUp();
    const expected = ['2020-02-14', '2020-02-16', '2020-02-15'];
    expect(result).toStrictEqual(expected);
  });
});
